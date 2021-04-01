import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  // const { Product } = data;
  console.log(data);
  if (loading) return <h2>LOADING</h2>;
  if (error) return <DisplayError error={error} />;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {data.Product.name}</title>
      </Head>
      <img
        src={data.Product.photo.image.publicUrlTransformed}
        alt={data.Product.photo.altText}
      />
      <div className="details">
        <h2>{data.Product.name}</h2>
        <p>{data.Product.description}</p>
        <p>{data.Product.price}</p>
      </div>
    </ProductStyles>
  );
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  /* min-height: 800px; */
  max-width: var(--maxWidth);
  align-items: center;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
