import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public itens: Question[] = []

  async create(question: Question) {
    this.itens.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.itens.find((question) => question.slug.value === slug)
    return question ?? null
  }
}
