import { Request, Response, NextFunction } from 'express'

type UniqueChecker = (value: string, req: Request) => Promise<boolean>

type Rule = {
    field: string
    required?: boolean
    minLength?: number
    unique?: UniqueChecker
}
export const validate = (rules: Rule[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = []

        for (const rule of rules) {
            const value = req.body?.[rule.field]

            if (rule.required && (value === undefined || value === '')) {
                errors.push(`${rule.field} is required`)
                continue
            }

            if (
                rule.minLength &&
                typeof value === 'string' &&
                value.length < rule.minLength
            ) {
                errors.push(
                    `${rule.field} must be at least ${rule.minLength} chars`
                )
                continue
            }

            if (rule.unique && value !== undefined) {
                const isUnique = await rule.unique(value, req)
                if (!isUnique) {
                    errors.push(`${rule.field} must be unique`)
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                ok: false,
                errors,
            })
        }

        next()
    }
}

