import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Button, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

export interface IFormInputs {
  email: string;
  password: string;
}

export const AuthForm: React.FC = () => {
  const { actions } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    mode: 'all',
    resolver: yupResolver(SignUpSchema)
  });

  const onSubmit = (dataInputs: IFormInputs) => actions?.signUp(dataInputs);

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Enter Email Address</FormLabel>
        <FormControl placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>

        <FormLabel>Enter Password</FormLabel>
        <FormControl placeholder="Password" {...register('password')} />
        <p>{errors.password?.message}</p>
        <Button variant="primary" type="submit" style={{ width: '100%' }} disabled={!!Object.entries(errors).length}>
          Sign Up
        </Button>
      </Form>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Required'),
  password: Yup.string()
    .min(10, 'password must be 10 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      'password must have atleast 1 upper case letter, lower case letter, number and a special character'
    )
    .required('Required')
});
