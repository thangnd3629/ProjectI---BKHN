import React, { Component } from 'react'
import axiosInstance from '../../axios'
import Taggy from '../../components/Tagger/Taggy'
class Ner extends Component {
    state = {
        input: null,
        response: null,
        parse_option: null,
        annotated: null,

    }
    onSubmitHandler = (e) => {
        const input_field = this.state.input
        axiosInstance.post(
            '/ner',
            { input: input_field }
        ).then(
            response => {
                this.setState({ response: response.data.sentences });
            }
        )

        if (this.state.parse_option === "NER") {
            var annotated = {}
            var sentences = this.state.response
            for (let i = 0; i < sentences.length; i++) {
                var segment_sentence = sentences[i];
                annotated["sentenceNo" + i] = {}
                annotated["sentenceNo" + i]["text"] = []
                annotated["sentenceNo" + i]["spans"] = []


                for (let k = 0; k < segment_sentence.length; k++) {

                    annotated["sentenceNo" + i]["text"].push(segment_sentence[k]["form"])

                    annotated["sentenceNo" + i]["spans"].push(
                        {
                            type: segment_sentence[k]["nerLabel"],
                            index: segment_sentence[k]["index"] - 1,
                            pos: segment_sentence[k]["posTag"]
                        }
                    )

                }

            }
            this.setState({ annotated: annotated })



        }
        else if (this.state.parse_option === "WORD SEGMENTATION") {
            axiosInstance.post(
                '/textclassification',
                { input: input_field }
            ).then(
                response => {

                    this.setState({ classified: response.data })
                }
            )
        }
    }
    optionChoosingHandler = (e) => {
        this.setState({ parse_option: e.target.innerText })

    }
    inputOnChangeHandler = (e) => {
        this.setState({ input: e.target.value })
    }
    render() {

        var taggy = null;
        var pos_tag = null;
        var word_segment = null;
        var copyState = { ...this.state }
        
        //NER
        const color = [
            { type: 'b-per', color: { r: 166, g: 226, b: 45 } },
            { type: 'i-org', color: { r: 67, g: 198, b: 252 } },
            { type: 'date', color: { r: 47, g: 187, b: 171 } },
            { type: 'b-org', color: { r: 20, g: 170, b: 171 } },
            { type: 'b-loc', color: { r: 128, g: 0, b: 128 } },

        ]
        if (this.state.annotated && this.state.parse_option === "NER") {
            taggy = Object.values(copyState.annotated).map(
                (elm, id) => {
                    return (
                        <Taggy
                            key={id}
                            text={elm.text}
                            spans={elm.spans}

                            ents={color}
                        ></Taggy>
                    )
                }
            )
        }
        //
        if (this.state.annotated && this.state.parse_option === "NER") {
            taggy = Object.values(copyState.annotated).map(
                (elm, id) => {
                    return (
                        <Taggy
                            key={id}
                            text={elm.text}
                            spans={elm.spans}

                            ents={color}
                        ></Taggy>
                    )
                }
            )
        }
        if (this.state.annotated && this.state.parse_option === "NER") {
            taggy = Object.values(copyState.annotated).map(
                (elm, id) => {
                    return (
                        <Taggy
                            key={id}
                            text={elm.text}
                            spans={elm.spans}

                            ents={color}
                        ></Taggy>
                    )
                }
            )
        }




        return (

            <div>
                <form>
                    <div className="form-group">
                        <label >Input</label>
                        <textarea className="form-control" rows="3" onChange={(e) => this.inputOnChangeHandler(e)} ></textarea>
                    </div>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {!this.state.parse_option ? "Choose parsing option" : this.state.parse_option}
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <button type="button" className="dropdown-item" onClick={(e) => { this.optionChoosingHandler(e) }}>NER</button>
                            <button type="button" className="dropdown-item" onClick={(e) => { this.optionChoosingHandler(e) }}>POS TAGGING</button>
                            <button type="button" className="dropdown-item" onClick={(e) => { this.optionChoosingHandler(e) }}>WORD SEGMENTATION</button>

                        </div>
                    </div>

                </form>
                <button type="button" className="btn btn-primary" style={{ marginTop: "10px", marginBottom: "10px" }} onClick={(e) => this.onSubmitHandler(e)}>Start</button>

                { taggy}
                { pos_tag}
                {word_segment}








            </div >

        );
    }
}
export default Ner;