pipeline {
  agent any
  tools {node "NodeJs" }
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