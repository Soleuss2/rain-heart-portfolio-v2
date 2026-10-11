import type { Project } from '../../data/portfolio'

export function getProjectStatus(project: Project) {
  if (project.inProgress) {
    return { label: 'IN PROGRESS', className: 'text-arc-orange' }
  }
  if (project.links.live) {
    return { label: 'LIVE', className: 'text-arc-green' }
  }
  return { label: 'SOURCE ON GITHUB', className: 'text-arc-cyan' }
}