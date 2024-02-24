/* eslint-disable react/no-unescaped-entities */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';

export const FeedbackPage = () => {
  const [inputFeedBackForm, setInputFeedBackForm] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    price: '',
    cover: '',
    images: '',
    reserved: '',
    namefeedb: '',
    feedback: '',
  });

  // inputFeedBackForm irasymo formos pildymo 'on submit' valdymas
  const handleForm = (e) => {
    setInputFeedBackForm((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // postiname ivedamos knygos duomenis i DB, masyvas -> inputFeedBackForm
    axios
      .post('https://65d1faa1987977636bfbc142.mockapi.io/api/react-test/books', inputFeedBackForm)
      .then((res) => {
        console.log('res', res);

        alert(`Thank you, ${res.data.namefeedb} we have received your feedback.`);

        // setTimeout(() => {
        //   alert(`Your book ${res.data.namefeedb} is registered`);
        // }, 2000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Book Feedback Page</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name..."
            name="namefeedb"
            value={inputFeedBackForm.namefeedb}
            onChange={handleForm}
          />
          <Form.Text className="text-muted">We will never share your name with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBookTitle">
          <Form.Label>Book title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title..."
            name="title"
            value={inputFeedBackForm.title}
            onChange={handleForm}
          />
          <Form.Text className="text-muted">We we respect your opinion.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFeedback">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Your feedback..."
            value={inputFeedBackForm.feedBText}
            onChange={handleForm}
          />
          <Form.Text className="text-muted">Don't bother! write what you think.</Form.Text>
        </Form.Group>
        <br></br>
        <Button style={{ marginBottom: '4%' }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
