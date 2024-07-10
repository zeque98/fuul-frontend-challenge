import { Fuul } from './Fuul';
import { fetchProjectInfo } from './api';
import { ProjectInfo } from './types';

jest.mock('./api');

describe('Fuul', () => {
  let fuul: Fuul;
  let mockProjectInfo: ProjectInfo;

  beforeEach(() => {
    fuul = new Fuul();

    mockProjectInfo = {
      apiKey: 'project1',
      id: '1',
      name: 'Project One',
      description: 'Description for Project One',
      trackingLink: 'www.red.fd/referral?referrer=123',
      connectedAddress: '0x123...',
    };

    (fetchProjectInfo as jest.Mock).mockResolvedValue(mockProjectInfo);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = ''; // Clear DOM after each test
  });

  describe('init', () => {
    it('should initialize project info with valid API key', async () => {
      await fuul.init('validApiKey');
      expect(fetchProjectInfo).toHaveBeenCalledWith('validApiKey');
      expect(fuul['projectInfo']).toEqual(mockProjectInfo);
    });

    it('should throw an error if apiKey is not present', async () => {
      await expect(fuul.init('')).rejects.toThrow('API key is required');
    });

    it('should throw an error if already loading', async () => {
      fuul['isLoading'] = true;
      await expect(fuul.init('validApiKey')).rejects.toThrow(
        'Project info is still loading. Try again later.',
      );
    });

    it('should throw an error if fetchProjectInfo fails', async () => {
      (fetchProjectInfo as jest.Mock).mockRejectedValue(
        new Error('Fetch error'),
      );
      await expect(fuul.init('invalidApiKey')).rejects.toThrow(
        'Failed to fetch project info',
      );
    });
  });

  describe('showReferralModal', () => {
    it('should show referral modal with project info when initialized', async () => {
      await fuul.init('validApiKey');
      fuul.showReferralModal();

      const modalContainer = document.querySelector('.modal-container');
      expect(modalContainer).not.toBeNull();

      const modalContent = modalContainer?.querySelector('.modal-content');
      expect(modalContent).not.toBeNull();
      expect(modalContent?.innerHTML).toContain(mockProjectInfo.name);
      expect(modalContent?.innerHTML).toContain(mockProjectInfo.description);
    });

    it('should throw an error if project info is still loading', () => {
      fuul['isLoading'] = true;
      expect(() => fuul.showReferralModal()).toThrow(
        'Project info is still loading. Try again later.',
      );
    });

    it('should throw an error if project info is not initialized', () => {
      expect(() => fuul.showReferralModal()).toThrow(
        'Project info not initialized. Call init method first.',
      );
    });

    it('should close the modal when close button is clicked', async () => {
      await fuul.init('validApiKey');
      fuul.showReferralModal();

      const closeButton = document.querySelector('.close-button');
      expect(closeButton).not.toBeNull();

      closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('.modal-container')).toBeNull();
    });
  });
});
