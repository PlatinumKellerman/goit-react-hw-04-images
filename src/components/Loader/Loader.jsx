import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThreeDots } from 'react-loader-spinner';
import { ButtonWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <ButtonWrapper>
      <ThreeDots color="tomato" height={100} width={100} />;
    </ButtonWrapper>
  );
};
