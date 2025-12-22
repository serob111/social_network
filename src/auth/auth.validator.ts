import { Request, Response, NextFunction } from 'express'
import { FieldError, badRequest } from '../utils/http.responses'

type UniqueChecker = (value: string, req: Request) => Promise<boolean>

type Rule = {
  field: string
  required?: boolean
  minLength?: number
  unique?: UniqueChecker
}

export const validate = (rules: Rule[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: FieldError[] = []

    for (const rule of rules) {
      const value = req.body?.[rule.field]

      if (rule.required && (value === undefined || value === '')) {
        errors.push({
          field: rule.field,
          message: `${rule.field} is required`,
        })
        continue
      }

      if (
        rule.minLength &&
        typeof value === 'string' &&
        value.length < rule.minLength
      ) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be at least ${rule.minLength} characters`,
        })
        continue
      }

      if (rule.unique && value !== undefined) {
        const isUnique = await rule.unique(value, req)
        if (!isUnique) {
          errors.push({
            field: rule.field,
            message: `${rule.field} already exists`,
          })
        }
      }
    }

    if (errors.length > 0) {
      return badRequest(res, errors)
    }

    next()
  }
}
