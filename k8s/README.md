Resources
-----
- https://www.youtube.com/watch?v=X48VuDVv0do
- https://youtu.be/RRCrY12VY_s?si=sVdKgdX2-4_H1GPF
- https://github.com/canonical/microk8s/issues/3836

- alias k="minikube kubectl --" 
- kubectl create namespace k8s-workspace


- k delete -f mongo.yaml
- k delete -f mongo-express.yaml
- k delete -f mongo-secret.yaml
- k delete -f mongo-express.configMap.yaml


- k create -f mongo-secret.yaml
- k create -f mongo-express.configMap.yaml
- k create -f mongo.yaml
- k create -f mongo-express.yaml

to verify run: `k get all -n k8s-workspace`

minikube service mongo-express-service -n k8s-workspace

on credentials prompt enter username `admin` and password `pass`

To manage multiple namespaces, install kubectx using brew `brew install kubectx` which installs `kubens`. after installation, to list all namespaces run `kubens`

To change a namespace `kubens k8s-workspace`. 

Now running `minikube service mongo-express-service` without providing namespace should work fine.