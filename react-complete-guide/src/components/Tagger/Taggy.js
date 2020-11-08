import React from 'react'

// Define functional component. Destructure the props.
const Taggy = (props) => {
    var text = props.text
    var spans = props.spans
    var ents = props.ents
    console.log(text)
    console.log(spans)
    // Find the correct color of the given entity type. If the given entity is not found, set the color to grey.
    const findRed = (type) => {
        

        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.r
            }
        }
        return 220
        
    }
    const findGreen = (type) => {
        if(ents)
        {
        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.g
            }
        }
    }
    return 220
        
    }
    const findBlue = (type) => {
        if(ents)
        {
        for (let e = 0; e < ents.length; e++) {
            if (ents[e].type === type) {
                return ents[e].color.b
            }
        }
    }
    return 220
        
    }

    // Initialize an empty array that will hold the text and entities
    let jsx = []
    

    // METHOD 2 - TOKENS
    if (Array.isArray(text)) {
        // Rename 'text' to 'tokens' for clarity
        let tokens = [...text]
        console.log(tokens)
        // Loop through the 'spans' array. Use the span data to update our 'tokens' array with entities
        for (let s = 0; s < spans.length; s++) {
            tokens[spans[s].index] = {
                token: tokens[spans[s].index],
                type: spans[s].type.toLowerCase()
            }
        }
        console.log(tokens)
        // Loop through the tokens array, looking for multi-word entities
        // for (let t = 0; t < tokens.length; t++) {
        //     // Check if we've stopped at an entity
        //     if (tokens[t].token) {
        //         // Examine the consecutive entities, if any.
        //         for (let i = t + 1; i < tokens.length; i++) {
        //             // Combine consecutive entities of the same type into one entity. Then, mark the duplicates as 'false'.
        //             if (typeof tokens[i] !== 'string' && tokens[i].type === tokens[t].type) {
        //                 tokens[t].token += ' ' + tokens[i].token
        //                 tokens[i] = false
        //             }
        //             // Stop the loop when we've run out of consecutive entities
        //             if (typeof tokens[i] === 'string') {
        //                 break
        //             }
        //         }
        //     }
        // }
        // // Filter out the consecutive entities that were marked as duplicates
        // tokens = tokens.filter(val => !!val)
        // // Add a space to the end of each string/non-entity
        // let tokensWithSpaces = tokens.map(t => {
        //     if (typeof t === 'string') {
        //         return `${t} `
        //     }
        //     return t
        // })
        let tokensWithSpaces = tokens
        // Loop through our 'tokens' array. Push strings directly to the 'jsx' array. Convert entity objects to jsx markup, then push to the 'jsx' array.
        tokensWithSpaces.forEach(t => {
            if (typeof t === 'string') {
                jsx.push(t)
            }
            else {
                jsx.push(
                    <mark
                        style={{
                            padding: '0.25em 0.35em',
                            margin: '0px 0.25em',
                            lineHeight: '1',
                            display: 'inline-block',
                            borderRadius: '0.25em',
                            border: '1px solid',
                            background: `rgba(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)},
                                0.2
                            )`,
                            borderColor: `rgb(
                                ${findRed(t.type)},
                                ${findGreen(t.type)},
                                ${findBlue(t.type)}
                            )`
                        }}
                    >
                        {t.token}
                        <span
                            style={{
                                boxSizing: 'border-box',
                                fontSize: '0.6em',
                                lineHeight: '1',
                                padding: '0.35em',
                                borderRadius: '0.35em',
                                textTransform: 'uppercase',
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                margin: '0px 0px 0.1rem 0.5rem',
                                background: `rgb(
                                    ${findRed(t.type)},
                                    ${findGreen(t.type)},
                                    ${findBlue(t.type)}
                                )`
                            }}
                        >
                            {t.type}
                        </span>
                    </mark>
                )
            }
        })
    }

    // Return the markup
   
    
    return (
        
        <div>
            {jsx.map((j, i) => (
                <span key={i}>{j}</span>
            ))}
        </div>
    )

}

export default Taggy