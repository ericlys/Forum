import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public itens: Question[] = []

  async findById(id: string) {
    const question = this.itens.find((item) => item.id.toString() === id)

    return question ?? null
  }

  async save(question: Question) {
    const itemIndex = this.itens.findIndex((item) => item.id === question.id)

    this.itens[itemIndex] = question
  }

  async create(question: Question) {
    this.itens.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.itens.find((question) => question.slug.value === slug)
    return question ?? null
  }

  async delete(question: Question) {
    const itemIndex = this.itens.findIndex((item) => item.id === question.id)

    this.itens.splice(itemIndex, 1)
  }
}
