class FormBuilder {
    addTextField(placeholder) {
      /* abstract */
    }
    addDropdownField(placeholder, options) {
      /* abstract */
    }
    addCheckboxField(placeholder) {
      /* abstract */
    }
    getForm() {
      /* abstract */
    }
  }
  
  class ConcreteFormBuilder extends FormBuilder {
    constructor() {
      super()
      this.form = new Form()
    }
  
    addTextField(placeholder) {
      this.form.addField({ type: "input", placeholder })
      return this
    }
  
    addDropdownField(placeholder, options) {
      this.form.addField({ type: "select", placeholder, options })
      return this
    }
  
    addCheckboxField(placeholder) {
      this.form.addField({
        type: "input",
        placeholder,
        inputType: "checkbox",
      })
      return this
    }
  
    getForm() {
      return this.form
    }
  }
  
  class Form {
    constructor() {
      this.fields = []
    }
  
    addField(field) {
      this.fields.push(field)
    }
  
    render() {
      const formElement = document.createElement("form")
      this.fields.forEach((field) => {
        let fieldElement
  
        if (field.type === "select") {
          fieldElement = document.createElement("select")
          field.options.forEach((option) => {
            const optionElement = document.createElement("option")
            optionElement.value = option
            optionElement.text = option
            fieldElement.appendChild(optionElement)
          })
        } else if (field.inputType === "checkbox") {
          // Create label element to wrap the checkbox and display the text
          const labelElement = document.createElement("label")
          fieldElement = document.createElement("input")
          fieldElement.type = "checkbox"
          labelElement.appendChild(fieldElement)
          labelElement.appendChild(
            document.createTextNode(` ${field.placeholder}`),
          )
          formElement.appendChild(labelElement)
        } else {
          fieldElement = document.createElement("input")
          fieldElement.type = field.inputType || "text"
          fieldElement.placeholder = field.placeholder
          formElement.appendChild(fieldElement)
        }
  
        if (field.inputType !== "checkbox") {
          formElement.appendChild(fieldElement)
        }
      })
  
      document.body.appendChild(formElement)
    }
  }
  
  // Use the ConcreteFormBuilder to construct the form
  const formBuilder = new ConcreteFormBuilder()
  
  const registrationForm = formBuilder
    .addTextField("Name")
    .addTextField("Email")
    .addDropdownField("Country", ["USA", "Canada", "UK"])
    .addCheckboxField("Subscribe to newsletter")
    .addTextField("Country")
    .getForm()
  
  registrationForm.render();