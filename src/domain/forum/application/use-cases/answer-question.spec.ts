import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoreAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoreAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoreAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoreAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
