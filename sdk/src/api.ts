import { ProjectInfo, GenericProjectInfo } from './types';

const projectData: ProjectInfo[] = [
  {
    apiKey: 'project1',
    id: '1',
    name: 'Project One',
    description: 'Description for Project One',
    trackingLink: `${window.location.origin}/referral?referrer=123`,
    connectedAddress: '0x123...',
  },
  {
    apiKey: 'project2',
    id: '2',
    name: 'Project Two',
    description: 'Description for Project Two',
    trackingLink: `${window.location.origin}/referral`,
    connectedAddress: '0x456...',
  },
];

export const fetchProjectInfo = async <T extends GenericProjectInfo>(
  apiKey: string,
): Promise<T> => {
  const response = await new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      const project = projectData.find((p) => p.apiKey === apiKey) as T;

      if (project) {
        resolve(project);
      } else {
        reject(new Error(`Project with apiKey ${apiKey} not found`));
      }
    }, 1000);
  });

  return response;
};
