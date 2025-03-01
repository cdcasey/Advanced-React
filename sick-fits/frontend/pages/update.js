import PropTypes from 'prop-types';

import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateProduct productId={query.id} />
    </div>
  );
}

UpdatePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
