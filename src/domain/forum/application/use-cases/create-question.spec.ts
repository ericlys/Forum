import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoreQuestionRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase // system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoreQuestionRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoreQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoreQuestionRepository.itens[0].id).toEqual(question.id)
  })
})
