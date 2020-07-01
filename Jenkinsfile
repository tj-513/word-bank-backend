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
    stage('execute'){
      steps {
        sh 'yarn start &'
        sh 'sleep 1'
      }
    }
  }
}