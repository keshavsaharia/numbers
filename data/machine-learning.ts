import { SectionGroup } from '@/components/types'

export default {
  title: 'Machine Learning Algorithms',
  description: 'A series of interactive lessons and guides to implementing machine learning algorithms from scratch.',
  base: '/ml',
  sections: [
    {
        title: 'Markov Chains',
        description: 'A Markov chain is a simple probabilistic model that can be used to generate text.',
        link: '/ml/markov-chains',
        path: 'markov-chains'
    },
    {
        title: 'Perceptron Network',
        description: 'Implement a multi-layer perceptron network that can be trained to recognize handwritten digits.',
        link: '/ml/perceptron',
        path: 'perceptron',
        image: '/icon/ml/perceptron.png'
    },
    {
      title: 'Evolutionary Algorithms',
      description: 'Implement an evolutionary algorithm that optimizes a neural network through natural selection.',
      link: '/ml/evolution',
      path: 'evolution'
    },
    {
        title: 'Logistic Regression',
        description: 'Implement a logistic regression model that can be trained to classify data into two classes.',
        link: '/ml/logistic-regression',
        path: 'logistic-regression'
    },
    {
        title: 'K-Nearest Neighbors',
        description: 'Implement a K-Nearest Neighbors model that can be trained to classify data into multiple classes.',
        link: '/ml/k-nearest-neighbors',
        path: 'k-nearest-neighbors'
    },
    
    {
        title: 'Decision Trees',
        description: 'Implement a decision tree model that can be trained to classify data into multiple classes.',
        link: '/ml/decision-trees',
        path: 'decision-trees'
    },
    
    {
        title: 'Random Forests',
        description: 'Implement a random forest model that can be trained to classify data into multiple classes.',
        link: '/ml/random-forests',
        path: 'random-forests'
    },
    {
      title: 'Support Vector Machines',
      description: 'Implement a support vector machine model that can be trained to classify data into multiple classes.',
      link: '/ml/svm',
      path: 'svm'
    },
    {
      title: 'Convolutional Neural Networks',
      description: 'Implement a convolutional neural network model that can be trained to classify data into multiple classes.',
      link: '/ml/cnn',
      path: 'cnn'
    },
    {
      title: 'Recurrent Neural Networks',
      description: 'Implement a recurrent neural network model that can be trained to classify data into multiple classes.',
      link: '/ml/rnn',
      path: 'rnn'
    },
    {
      title: 'Long Short-Term Memory Networks',
      description: 'Implement a long short-term memory network model that can be trained to classify data into multiple classes.',
      link: '/ml/lstm',
      path: 'lstm'
    },
    {
      title: 'Generative Adversarial Networks',
      description: 'Implement a generative adversarial network model that can be trained to generate data.',
      link: '/ml/gan',
      path: 'gan'
    },
    {
      title: 'Transformer Networks',
      description: 'Implement a transformer network model that can be trained to classify data into multiple classes.',
      link: '/ml/transformer',
      path: 'transformer'
    },
    {
      title: 'Autoencoders',
      description: 'Implement an autoencoder model that can be trained to compress data into a lower-dimensional representation.',
      link: '/ml/autoencoder',
      path: 'autoencoder'
    },
    {
      title: 'Variational Autoencoders',
      description: 'Implement a variational autoencoder model that can be trained to compress data into a lower-dimensional representation.',
      link: '/ml/vae',
      path: 'vae'
    }
  ]
} satisfies SectionGroup