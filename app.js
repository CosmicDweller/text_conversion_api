const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

function convertToHexadecimal(input){
  let hexResult = '';
  
  for (let i = 0; i < input.length; i++) {
    const hex = input.charCodeAt(i).toString(16);
    hexResult += hex.padStart(2, '0') + ' ';
  }

  return hexResult.trim();
}

function convertToOctal(input){
  let octalResult = '';
  
  for (let i = 0; i < input.length; i++){
    const octal = input.charCodeAt(i).toString(8);
    octalResult += octal.padStart(3, '0') + ' ';
  }

  return octalResult.trim();
}

function convertToBinary(input) {
    let binaryResult = '';
    
    for (let i = 0; i < input.length; i++) {
      const binary = input.charCodeAt(i).toString(2);
      binaryResult += binary.padStart(8, '0') + ' ';
    }
    
    return binaryResult.trim();
}

let binary_conversions = {};
let hexadecimal_conversions = {};
let octal_conversions = {};
let binary_current_id = 1;
let hexadecimal_current_id = 1;
let octal_current_id = 1;

app.post('/binary', (req, res) => {
  const data = req.body;
  const binary = convertToBinary(data.text);
//  console.log(`Text: ${data.text}`);
//  console.log(`Binary Representation: ${binary}`);
  
  binary_conversions[binary_current_id] = {'id': binary_current_id, 'original_text': data.text, 'binary': binary};
  binary_current_id++;

  res.status(200).json({
    message: 'Data recieved',
    recievedDate: data
  });
});

app.post('/hexadecimal', (req, res) => {
  const data = req.body;
  const hexadecimal = convertToHexadecimal(data.text);
//  console.log(`Text: ${data.text}`);
//  console.log(`Hexadecimal Representation: ${hex}`);
  
  hexadecimal_conversions[hexadecimal_current_id] = {'id': hexadecimal_current_id, 'original_text': data.text, 'hexadecimal': hexadecimal};
  hexadecimal_current_id++;

  res.status(200).json({
    message: 'Data recieved',
    recievedDate: data
  });
});

app.post('/octal', (req, res) => {
  const data = req.body;
  const octal = convertToOctal(data.text);
//  console.log(`Text: ${data.text}`);
//  console.log(`Octal Representation: ${octal}`);

  octal_conversions[octal_current_id] = {'id': octal_current_id, 'original_text': data.text, 'octal': octal};
  octal_current_id++;

  res.status(200).json({
    message: 'Data recieved',
    recievedDate: data
  });
});


app.get('/binary/:id', (req, res) => {
  const id = req.params.id;
  const binary_conversion = binary_conversions[id];

  if (binary_conversion) {
    res.json(binary_conversion);
  } else {
    res.status(404).json({error: `No binary conversion found for ID ${id}`})
  }
});

app.get('/hexadecimal/:id', (req, res) => {
  const id = req.params.id;
  const hexadecimal_conversion = hexadecimal_conversions[id];

  if (hexadecimal_conversion) {
    res.json(hexadecimal_conversion);
  } else {
    res.status(404).json({error: `No binary conversion found for ID ${id}`})
  }
});

app.get('/octal/:id', (req, res) => {
  const id = req.params.id;
  const octal_conversion = octal_conversions[id];

  if (octal_conversion) {
    res.json(octal_conversion);
  } else {
    res.status(404).json({error: `No binary conversion found for ID ${id}`})
  }
});

app.get('/binary', (req, res) => {
  res.json(binary_conversions);
});

app.get('/hexadecimal', (req, res) => {
  res.json(hexadecimal_conversions);
});

app.get('/octal', (req, res) => {
  res.json(octal_conversions);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
