import { Formik } from 'formik';
import * as yup from 'yup';
import { FcSearch } from 'react-icons/fc';
import {
  StyledHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required('This field cannot be empty'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.name);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <StyledHeader>
          <SearchForm>
            <SearchFormButton type="submit">
              <FcSearch size={32} />
            </SearchFormButton>
            <SearchFormInput
              name="name"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </StyledHeader>
      </Formik>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
