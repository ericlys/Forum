import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-queston-best-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionRepository.itens[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
