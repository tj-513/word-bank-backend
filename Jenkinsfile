pipeline {
  agent any
  node {
    env.NODEJS_HOME = "${tool 'Node 6.x'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'
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