pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'yarn'
      }
    }
    stage('execute'){
      steps {
        sh 'yarn start'
      }
    }
  }
}