'use client';

import { userService } from '@services/user';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function Register() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (form: { name: string; email: string; password: string; confirmPassword: string }) => {
    const { name, email, password } = form;
    await userService.register({ name, email, password });
  };

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign-In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input input-bordered w-full max-w-sm"
              type="text"
              {...register('name', {
                required: 'Name is required'
              })}
            />
            {errors.name?.message ? <div className="text-error">{errors.name?.message}</div> : null}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="input input-bordered w-full max-w-sm"
              type="text"
              {...register('email', {
                required: 'Email is required'
                // pattern: {
                //   value: /[a-z0-9]+@[a-z]{2, 3}/g,
                //   message: 'Invalid email'
                // }
              })}
            />
            {errors.email?.message ? <div className="text-error">{errors.email?.message}</div> : null}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input input-bordered w-full max-w-sm"
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
            />
            {errors.password?.message ? <div className="text-error">{errors.password?.message}</div> : null}
          </div>
          <div className="my-2">
            <label className="label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              className="input input-bordered w-full max-w-sm"
              type="password"
              {...register('confirmPassword', {
                required: 'Re-enter password',
                validate: value => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                }
              })}
            />
            {errors.confirmPassword?.message ? (
              <div className="text-error">{errors.confirmPassword?.message}</div>
            ) : null}
          </div>
          <div className="my-4">
            <button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
              Submit {isSubmitting ? <span className="loading loading-spinner"></span> : null}
            </button>
          </div>
        </form>
        <Link className="text-info text-sm" href="/signin">
          Have account? Sign In.
        </Link>
      </div>
    </div>
  );
}
