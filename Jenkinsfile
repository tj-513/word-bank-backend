pipeline {
  agent {
    docker {
      image 'node:10.15.3-slim'
      args '-p 3000:3000'
    }
  }
  stages {
    stage('build') {
      steps {
        sh 'yarn'
      }
    }
    stage('deliver'){
      when{
        branch 'develop'
      }

      steps {
        sh 'pm2 delete -s word-bank || :'
        sh 'pm2 start src/index.js --name=word-bank'
      }
    }
  }
}