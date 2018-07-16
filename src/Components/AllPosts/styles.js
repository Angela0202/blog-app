export default {
  card: {
    width: '32%',
    height: '220px',
    margin: '7px',
    minWidth: '150px',
    maxWidth: '364px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px #57c9c4',

    '&:hover': {
      backgroundColor: '#57c9c4',
      transition: '.9s',
      color: '#fff',
    }
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    minWidth: '90vw'
  },

  actions: {
    display: 'flex',
    justifyContent: 'end'
  },

  postBody: {
    fontSize: '16px'
  }
}