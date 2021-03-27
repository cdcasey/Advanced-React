import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Product from './Product';

export const ALL_PRODUCTS_QUEYRY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
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

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUEYRY);
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
