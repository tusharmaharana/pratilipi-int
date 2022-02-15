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
    <>
      <StyledContainer>
        <h1 className="mb-5">Pratilipi Project</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>Enter Email Address</FormLabel>
          <StyledInputDiv error={!!errors.email?.message}>
            <FormControl placeholder="Email" {...register('email')} />
            <StyledErrorDiv>{errors.email?.message}</StyledErrorDiv>
          </StyledInputDiv>

          <FormLabel>Enter Password</FormLabel>
          <StyledInputDiv error={!!errors.password?.message}>
            <FormControl placeholder="Password" {...register('password')} />
            <StyledErrorDiv>{errors.password?.message}</StyledErrorDiv>
          </StyledInputDiv>
          <Button variant="primary" type="submit" style={{ width: '100%' }} disabled={!!Object.entries(errors).length}>
            Sign Up
          </Button>
        </Form>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInputDiv = styled.div<{ error: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  small {
    max-width: 200px;
  }
  input {
    border: ${props => (props.error ? '1px solid red' : '1px solid #ced4da')};
  }
`;

const StyledErrorDiv = styled.small`
  color: red;
  margin: 10px 0 10px 0;
`;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email!').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(10, 'password must be 10 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      'password must have atleast 1 upper case letter, lower case letter, number and a special character'
    )
});
