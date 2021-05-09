import React, { Component } from "react";
import classes from "./TextClassification.css";
import axiosInstance from '../../axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
class TextClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifierList: [
        { title: 'Support Vector Machine' },
        { title: 'K-Nearest Neighbor' },
        { title: 'Random Forest' },
        { title: 'Logistic Regression' },
      ],
      available_classifier: [],
      trained_classifier: null,
      predict_classifier: null,
      training: false,
      predicting: false,
      finish_training_modal: false,
      predicted_type: null,
    };
    this.textInput = React.createRef();
  }
  componentDidMount() {
    axiosInstance.get(
      '/classification'
    ).then(
      response => {
        var available_classifier = response.data.trained_model
        available_classifier = available_classifier.map(elm => {
          if (elm === "logistic_model.pk") {
            return { "title": "Logistic Regression" }
          }
          if (elm === "random_forest_model.pk") {
            return { "title": "Random Forest" }
          }
          if (elm === "svm_model.pk") {
            return { "title": "Support Vector Machine" }
          }
          if (elm === "knn_model_tfidf.pk") {
            return { "title": "K-Nearest Neighbor" }
          }
        })
        this.setState({ available_classifier: available_classifier })
      }
    )
  }
  training_request_handler = () => {
    this.setState({ training: true })
    axiosInstance.post(
      '/classification/train/' + this.state.trained_classifier
    ).then(
      response => {
        this.setState({ finish_training_modal: true })
        this.setState({ training: false })
      }
    )
  }
  predicting_request_handler = () => {
    this.setState({ predicting: true })
    axiosInstance.post(
      '/classification/predict/' + this.state.predict_classifier,
      { "input": this.textInput.current.value }
    ).then(
      response => {

        this.setState({ predicted_type: response.data })
        this.setState({ predicting: false })
      }
    )
  }
  convert_names = (value) => {
    var chose_model
    if (value === null) {
      chose_model = null
    }
    else if (value.title === "K-Nearest Neighbor") {
      chose_model = "knn"
    }
    else if (value.title === "Support Vector Machine") {
      chose_model = "svm"
    }
    else if (value.title === "Random Forest") {
      chose_model = "randomforest"
    }
    else if (value.title === "Logistic Regression") {
      chose_model = "logistic"
    }
    return chose_model
  }
  render() {
    const train_props = {
      options: this.state.classifierList,
      getOptionLabel: (option) => option.title,
      onChange: (_, value) => {
        this.setState({ trained_classifier: this.convert_names(value) })
      }
    };
    const predict_props = {
      options: this.state.available_classifier,
      getOptionLabel: (option) => option.title,
      onChange: (_, value) => {
        this.setState({ predict_classifier: this.convert_names(value) })
      }
    }
    const finish_training_modal = <Modal show={this.state.finish_training_modal} onHide={() => { this.setState({ finish_training_modal: false }) }}>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>{this.state.trained_classifier} ready!</Modal.Body>

    </Modal>
    const finish_predicting_modal = <Modal show={this.state.predicted_type !== null} onHide={() => { this.setState({ predicted_type: null }) }}>
      <Modal.Header closeButton>
        <Modal.Title>Thể loại của văn bản</Modal.Title>
      </Modal.Header>
      <Modal.Body>{this.state.predicted_type}</Modal.Body>
    </Modal>
    return (
      <React.Fragment>
        {finish_training_modal}
        {finish_predicting_modal}
        <div className={classes.App}>
          <div className={classes.Card_main}>
            <div className={classes.Upload}>
              <span className={classes.Title}>Train classifier</span>
              <div className={classes.Content}>
                <div>

                  <Autocomplete
                    style={{ width: "50vw", marginTop: "30px" }}
                    {...train_props}
                    id="Classifier"
                    autoSelect
                    renderInput={(params) => <TextField {...params} label="Classifier" margin="normal" />}
                  />

                </div>
              </div>
              <div className={classes.Actions}>
                {
                  this.state.training ? <Button variant="dark" disabled={this.state.training} style={{ width: "20vw" }}>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />

                                            Loading...
                                          </Button> :
                    <button className="btn btn-success" disabled={this.state.trained_classifier === null ? true : false} onClick={this.training_request_handler} style={{ width: "20vw" }} >Start Training</button>
                }
              </div>
            </div>
          </div>
          <Autocomplete
            style={{ width: "60vw", marginTop: "30px" }}
            {...predict_props}
            id="debug"
            autoSelect
            renderInput={(params) => <TextField {...params} label="Available Classifier" margin="normal" />}
          />
          <form>
            <div className="form-group" style={{ width: "80vw", margin: "20px" }}>
              <label ><span className="badge badge-dark">Input</span></label>
              <textarea className="form-control" rows="3" style={{ height: "20vw" }} ref={this.textInput} ></textarea>
              {
                this.state.predicting ? <Button variant="dark" disabled style={{ width: "20vw" }}>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />

                                        Loading...
                                      </Button> :
                                      <button type="button" disabled={!this.state.predict_classifier} className="btn btn-primary" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={this.predicting_request_handler}>Analyze</button>

              }
              
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default TextClassification;
