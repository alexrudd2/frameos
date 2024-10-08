import { actions, afterMount, kea, listeners, path, reducers, selectors } from 'kea'

import { forms } from 'kea-forms'

import type { loginFormType } from './loginFormType'

export interface LoginFormForm {
  email: string
  password: string
}

export const loginForm = kea<loginFormType>([
  path(['src', 'scenes', 'login', 'loginForm']),
  forms(({ actions }) => ({
    loginForm: {
      defaults: {
        email: '',
        password: '',
      } as LoginFormForm,
      options: {
        showErrorsOnTouch: true,
        canSubmitWithErrors: true,
      },
      errors: (frame: Partial<LoginFormForm>) => ({
        email: !frame.email ? 'Please enter an e-mail address' : null,
        password: !frame.password ? 'Please enter a password' : null,
      }),
      submit: async (frame) => {
        try {
          const { email, password } = frame
          const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          if (response.ok) {
            window.location.href = '/'
          } else {
            let error: string
            try {
              const json = await response.json()
              error = json.error
            } catch (e) {
              error = response.statusText
            }
            actions.setLoginFormManualErrors({ password: error })
          }
        } catch (error) {
          console.error(error)
        }
      },
    },
  })),
])
