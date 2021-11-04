import React from "react";
import { render, cleanup, fireEvent} from "@testing-library/react";

// Testing components
import Form from "components/Appointment/Form";

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
    const onSave = jest.fn();
    const { getByText } = render(
      <Form 
        interviewers={interviewers}
        onConfirm={onSave}
        interviewer={interviewers[0]}
      >
      </Form>
    );
    const button = getByText('Save')
    fireEvent.click(button)

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form 
      interviewers={interviewers} 
      onConfirm={onSave} 
      interviewer={interviewers[0]}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
