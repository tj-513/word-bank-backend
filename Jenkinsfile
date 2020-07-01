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

        sh 'fuser -k 3000/tcp'
        sh 'yarn start &'
      }
    }
  }
}