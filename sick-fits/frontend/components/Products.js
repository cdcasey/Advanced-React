import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUEYRY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrl
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUEYRY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  console.log({ page, perPage, skip: page * perPage - perPage });
  // console.log(data);
  // console.log(error);
  if (loading) return <p>LOADING...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  const products = data.allProducts.map((product) => (
    <Product key={product.id} product={product}>
      {product.name}
    </Product>
  ));
  return (
    <div>
      <p>PROOOODUCTS!!</p>
      <ProductsListStyles>{products}</ProductsListStyles>
    </div>
  );
}
