const MAX_SEQUENCE_LENGTH = 113;
const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);

let model, emodel;
(async function() {
    model = await tf.loadLayersModel('https://zhiftydk.github.io/carterapi-showcase/scripts/ner/model.json');
    let outputs_ = [model.output, model.getLayer("attention_vector").output];
    emodel = tf.model({inputs: model.input, outputs: outputs_});
    console.log(emodel);
    document.body.style.display = "block";
})();


function word_preprocessor(word) {
  word = word.replace(/[-|.|,|?|!]+/g, '');
  word = word.replace(/d+/g, '1');
  word = word.toLowerCase();
  if (word != '') {
    return word;
  } else {
    return '.'
  }
};

function make_sequences(words_array) {
  let sequence = Array();
  words_array.slice(0, MAX_SEQUENCE_LENGTH).forEach(function(word) {
    word = word_preprocessor(word);
    let id = words_vocab[word];
    if (id == undefined) {
      sequence.push(words_vocab['<UNK>']);
    } else {
      sequence.push(id);
    }  
  });

  // pad sequence
  if (sequence.length < MAX_SEQUENCE_LENGTH) {
    let pad_array = Array(MAX_SEQUENCE_LENGTH - sequence.length);
    pad_array.fill(words_vocab['<UNK>']);
    sequence = sequence.concat(pad_array);
  }

  return sequence;
};

function ner(inputText) {
    return new Promise(async (resolve, reject) => {
        console.log(emodel);
        let words = inputText.split(' ');
        let sequence = make_sequences(words);
        let tensor = tf.tensor1d(sequence, dtype='int32')
          .expandDims(0);
        let [predictions, attention_probs] = await emodel.predict(tensor);
        attention_probs = await attention_probs.data();
        predictions = await predictions.argMax(-1).data();
        let predictions_tags = Array();
        predictions.forEach(function(tagid) {
          predictions_tags.push(getKey(tags_vocab, tagid));
        });
        resolve(words[predictions_tags.indexOf("B-PER")]);
    });
};