import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public itens: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.itens.push(questionComment)
  }
}
