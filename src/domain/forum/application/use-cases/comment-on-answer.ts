import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerOnQuestionUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface AnswerOnQuestionUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerOnQuestionUseCaseRequest): Promise<AnswerOnQuestionUseCaseResponse> {
    const question = await this.answerRepository.findById(answerId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return { answerComment }
  }
}
