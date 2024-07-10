import { fetchProjectInfo } from './api';
import { ProjectInfo } from './types';

class Fuul {
  private projectInfo: ProjectInfo | null = null;

  private isLoading = false;

  /**
   * Private method to show the referral modal.
   *
   * @param {ProjectInfo} projectInfo - The project information to display in the modal.
   */
  private renderModal(projectInfo: ProjectInfo): void {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal-content');

    modal.innerHTML = `
      <div
        aria-labelledby='modal-title'
        aria-modal='true'
        role='dialog'
        style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; z-index: 1000; color: black;"
      >
        <p>Project name: ${projectInfo.name}</p>
        <p>Project description: ${projectInfo.description}</p>
        <p>Share this link to refer others: <span style="font-weight: 600; color: skyblue;">${projectInfo.trackingLink}<span></p>
        <button class="close-button">Close</button>
      </div>
    `;

    const closeButton = modal.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
      });
    }

    modalContainer.appendChild(modal);
    document.body.appendChild(modalContainer);
  }

  /**
   * Initializes Fuul with the provided apiKey.
   *
   * @param {string} apiKey - The API key to identify the project.
   *
   * @throws {Error} If project info is still loading or fails to fetch.
   */
  async init(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    if (this.isLoading) {
      throw new Error('Project info is still loading. Try again later.');
    }

    try {
      this.isLoading = true;

      const projectInfo = await fetchProjectInfo(apiKey);

      if (projectInfo) {
        this.projectInfo = await fetchProjectInfo(apiKey);
      }
    } catch (error) {
      throw new Error('Failed to fetch project info');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Shows the referral modal.
   * Throws an error if the project is not initialized or is still loading.
   *
   * @throws {Error} If the project is not initialized or is still loading.
   */
  showReferralModal() {
    if (this.isLoading) {
      throw new Error('Project info is still loading. Try again later.');
    }
    if (!this.projectInfo) {
      throw new Error('Project info not initialized. Call init method first.');
    }

    this.renderModal(this.projectInfo);
  }
}

export { Fuul };
