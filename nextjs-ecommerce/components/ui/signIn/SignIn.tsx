import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function SignIn() {
  const { data: session } = useSession();
  //   const router = useRouter();
  const params = useSearchParams();

  const callbackUrl = params.get('callbackUrl') || '/';
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const renderInvalidLogin = params.get('error') ? (
    <div className="alert text-error">
      {params.get('error') === 'CredentialsSignin' ? 'Invalid email or password' : params.get('error')}
    </div>
  ) : null;

  const renderSuccessfulLoginMessage = params.get('success') ? (
    <div className="alert text-success">{params.get('success')}</div>
  ) : null;

  const onSubmit = (form: { email: string; password: string }) => {
    signIn('credentials', { ...form });
  };

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign-In</h1>
        {renderInvalidLogin}
        {renderSuccessfulLoginMessage}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="my-4">
            <button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
              Submit {isSubmitting ? <span className="loading loading-spinner"></span> : null}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
