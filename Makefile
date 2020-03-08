CLUSTER = altobyte
VERSION = latest
PROJECT = cronus
NAME = $(PROJECT)-ui
ECR_REGION = eu-west-1
ECR_ACCOUNT_NUMBER = 625174228527
ECR_REPO = $(ECR_ACCOUNT_NUMBER).dkr.ecr.$(ECR_REGION).amazonaws.com
APP_IMAGE = $(ECR_REPO)/$(NAME):$(VERSION)
NO_CACHE = false
GIT_VERSION = $(shell git rev-parse --short HEAD)

build:
	docker build -t $(NAME) .
	docker tag $(NAME):$(VERSION) $(APP_IMAGE)
.PHONY: build

run:
	docker run -p 8000:8000 -it cronus-ui:latest
.PHONY: run


push: build
	$(shell aws ecr get-login --no-include-email --region eu-west-1)
	docker push $(APP_IMAGE)
.PHONY: push

deploy: 
	aws ecs update-service --cluster $(CLUSTER) --service $(NAME) --force-new-deployment
.PHONY: deploy

ver:
	@echo '$(APP_IMAGE)'
	@echo '$(GIT_VERSION)'
.PHONY: ver

