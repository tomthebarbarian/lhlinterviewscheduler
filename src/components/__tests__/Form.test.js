
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
import { render, cleanup, fireEvent} from "@testing-library/react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import Form from "components/Appointment/Form";
/*
  We import the component that we are testing
*/
/*
  A test that renders a React Component
*/

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];



  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form 
        interviewers={interviewers}
        interviewer={interviewers[0]}
      />
    );
    
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    // expect(getByTestId("student-name-input")).toHaveValue("");
  });
  
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form 
        interviewers={interviewers}
        interviewer={interviewers[0]}
        value="Lydia Miller-Jones"
        student="Lydia Miller-Jones"
      />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form 
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onConfirm={onSave}
        interviewer={interviewers[0]}
        smalltext='/student name cannot be blank/i'
      >
      </Form>
    );
    /* 3. Click the save button */
    const button = getByText('Save')
    fireEvent.click(button)

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText } = render(
      <Form 
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onConfirm={onSave}
        interviewer={interviewers[0]}
      >
      </Form>
    );
    /* 3. Click the save button */
    const button = queryByText('Save')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
});
