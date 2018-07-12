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

    '&:hover': {
      backgroundColor: '#57c9c4',
      transition: '.9s',
      color: '#fff'
    }
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px'
  },

  actions: {
    display: 'flex',
    justifyContent: 'end'
  },

  postBody: {
    fontSize: '16px'
  }
}