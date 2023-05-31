import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCaseUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoreQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCaseUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoreQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCaseUseCase(inMemoreQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    console.log(newQuestion)

    await inMemoreQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
