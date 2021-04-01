import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ productId }) {
  /**
   * 1 get existing product
   * 2 get mutation
   * 3 need form to handle updates
   */

  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: productId },
  });

  const { inputs, handleChange, clearForm } = useForm(data?.Product);
  console.log('DATA', data);

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  if (loading) return <p>LODAING...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await updateProduct({
          variables: {
            id: productId,
            // data: inputs,
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        }).catch(console.error);
        console.log(response);
        // Submit input fields to backend
        // try {
        //   console.log('BEFORE DATA', data);
        //   const response = await createProduct();
        //   clearForm();
        //   console.log('AFTER DATA', data);
        //   Router.push({
        //     pathname: `/product/${response.data.createProduct.id}`,
        //   });
        // } catch (error) {
        //   console.log('ERROR TIME');
        //   console.error(error);
        // }
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}

UpdateProduct.propTypes = {
  productId: PropTypes.string.isRequired,
};
