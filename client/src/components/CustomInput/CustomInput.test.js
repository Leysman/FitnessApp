import { render } from '@testing-library/react';
import { Formik } from 'formik';
import CustomInput from '.';

describe('CustomInput snapshots', () => {

  test('renders regular input (no format)', () => {
    const { asFragment } = render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <CustomInput id="name" name="name" label="Name" />
      </Formik>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders formatted input (with format)', () => {
    const { asFragment } = render(
      <Formik initialValues={{ phone: '' }} onSubmit={() => {}}>
        <CustomInput id="phone" name="phone" label="Phone" format="+38 (###) ###-##-##" />
      </Formik>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders input with error', () => {
    const { asFragment } = render(
      <Formik
        initialValues={{ email: '' }}
        initialErrors={{ email: 'Email is required' }}
        initialTouched={{ email: true }}
        onSubmit={() => {}}
      >
        <CustomInput id="email" name="email" label="Email" />
      </Formik>
    );
    expect(asFragment()).toMatchSnapshot();
  });

});
