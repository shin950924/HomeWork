import instance from '../api/instance';

export function git(repository) {
  return instance.get(`/users/${repository}/repos`, {});
}

export function Issue(repository, repositoryName) {
  return instance.get(`/repos/${repository}/${repositoryName}`, {});
}

export function IssueList(repository, repositoryName, per_page, page) {
  console.log(
    `/repos/${repository}/${repositoryName}/issues?per_page=${per_page}&page=${page}`,
  );
  return instance.get(
    `/repos/${repository}/${repositoryName}/issues?per_page=${per_page}&page=${page}`,
    {},
  );
}
