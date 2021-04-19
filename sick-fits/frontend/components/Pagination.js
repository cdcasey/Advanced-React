import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import PageinationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  let productCount;
  let pageCount;

  if (loading) {
    productCount = '...';
    pageCount = '...';
  } else {
    productCount = data._allProductsMeta.count;
    pageCount = Math.ceil(productCount / perPage);
  }
  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <PageinationStyles>
      <Head>
        <title>
          Sick FIts - page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{productCount} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PageinationStyles>
  );
}
