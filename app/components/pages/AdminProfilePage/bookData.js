const bookData = [
  {
    all_books: [
      {
        book_id: '1',
        book_name: 'To Kill a Mockingbird',
        book_author: 'Harper Lee',
        book_genre: 'Fiction',
        total_count: 5,
        current_count: 4,
      },
      {
        book_id: '2',
        book_name: '1984',
        book_author: 'George Orwell',
        book_genre: 'Science Fiction',
        total_count: 7,
        current_count: 2,
      },
      {
        book_id: '3',
        book_name: 'Five Point Someone',
        book_author: 'Chetan Bhagat',
        book_genre: 'Fiction',
        total_count: 3,
        current_count: 0,
      },
      {
        book_id: '4',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 2,
        current_count: 2,
      },
      {
        book_id: '5',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 11,
        current_count: 10,
      },
      {
        book_id: '6',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 15,
        current_count: 0,
      },
      {
        book_id: '7',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 6,
        current_count: 3,
      },
      {
        book_id: '8',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 5,
        current_count: 2,
      },
      {
        book_id: '9',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 5,
        current_count: 2,
      },
      {
        book_id: '10',
        book_name: 'Room Number 108',
        book_author: 'Chetan Bhagat',
        book_genre: 'Crime Fiction',
        total_count: 2,
        current_count: 0,
      },
    ],
    issued_books: [
      {
        book_id: '1',
        issued_users: [
          {
            email: 'user1@example.com',
            issue_date: '2024-02-01',
            due_date: '2024-02-15',
          },
          {
            email: 'user2@example.com',
            issue_date: '2024-02-05',
            due_date: '2024-02-20',
          },
        ],
      },
    ],
    users: [
      {
        user_id: '1',
        email: 'user1@example.com',
        name: 'John Doe',
        password: 'password123',
        isAdmin: false,
        token: 'abc123',
        issued_books: [
          {
            book_id: '1',
            issue_date: '2024-02-01',
            due_date: '2024-02-15',
          },
        ],
        requested_books: [
          {
            book_id: '2',
            request_date: '2024-02-10',
          },
          {
            book_id: '9',
            request_date: '2024-02-15',
          },
        ],
      },
      {
        user_id: '2',
        email: 'user2@example.com',
        name: 'Jane Smith',
        password: 'qwerty456',
        isAdmin: false,
        token: 'xyz789',
        issued_books: [
          {
            book_id: '1',
            issue_date: '2024-02-05',
            due_date: '2024-02-20',
          },
        ],
        requested_books: [],
      },
    ],
    request_queue: [
      {
        book_id: '2',
        request_users: [
          {
            email: 'user1@example.com',
            request_date: '2024-02-10',
          },
        ],
      },
      {
        book_id: '9',
        request_users: [
          {
            email: 'user1@example.com',
            request_date: '2024-02-15',
          },
        ],
      },
    ],
    new_books_request_queue: [
      {
        request_id: '1',
        email: 'admin@example.com',
        date: '2024-02-15',
        book_name: 'Pride and Prejudice',
        book_author: 'Jane Austen',
      },
      {
        request_id: '2',
        email: 'user1@example.com',
        date: '2024-03-15',
        book_name: 'Jurassic',
        book_author: 'Michael Austen',
      },
    ],
  },
];

export default bookData;
