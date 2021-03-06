import { Label, Repo } from './labelsync-wrapper'

export const theme = {
  neutral: '#EEEEEE',
  refine: '#fcaeec',
  shiny: '#3BDB8D',
  semiShiny: '#9cedc6',
  danger: '#FF5D5D',
  warning: '#FFCF2D',
  social: '#7057ff',
}

export function repos(data: Repo[]) {
  for (const repo of data) {
    repo.labels.push(...commonLabels)
  }
  return data
}

interface ExtraOptions {
  siblings?: Label['siblings']
  alias?: Label['alias']
}

/**
 * Based off conventional commit notion of type. The kind of issue.
 * These labels may get their own colour to help visually differentiate
 * between them faster. The commit that closes this issue should generally
 * be of the same type as this label.
 */
export function type(
  name: string,
  color: string,
  description: string,
  extraOptions?: ExtraOptions,
): Label {
  return {
    name: `type/${name}`,
    color: color,
    description: description,
    ...extraOptions,
  }
}

/**
 * Labels that help us track issue short-circuites or other minimal
 * categorical details.
 */
export function note(name: string, description?: string, extraOptions?: ExtraOptions): Label {
  return {
    name: `note/${name}`,
    color: theme.neutral,
    description: description,
    ...extraOptions,
  }
}

/**
 * Labels that help us track how impactful issues will be. Combined
 * with complexity label, helps inform prioritization.
 */
export function impact(name: string, extraOptions?: ExtraOptions): Label {
  return {
    name: `impact/${name}`,
    color: theme.neutral,
    ...extraOptions,
  }
}

/**
 * Effort that help us track how impactful issues will be. Combined
 * with complexity label, helps inform prioritization.
 */
export function effort(name: string, extraOptions?: ExtraOptions): Label {
  return {
    name: `effort/${name}`,
    color: theme.neutral,
    ...extraOptions,
  }
}

/**
 * Labels that help us mark issues as being on hold for some reason.
 */
export const needs = (name: string, description?: string, extraOptions?: ExtraOptions): Label => ({
  name: `needs/${name}`,
  color: theme.warning,
  description: description,
  ...extraOptions,
})

/**
 * Based off conventional commit notion of scope. What area of
 * the project does the issue touch. The commit that closes this issue
 * should generally be of the same scope as this label.
 */
export function scope(name: string, description?: string, extraOptions?: ExtraOptions): Label {
  return {
    name: `scope/${name}`,
    color: '#94ebfc',
    description: description,
    ...extraOptions,
  }
}

/**
 * Labels that help us coordinate with the community.
 */
export function community(name: string, description?: string, extraOptions?: ExtraOptions): Label {
  return {
    name: `community/${name}`,
    color: theme.social,
    description: description,
    ...extraOptions,
  }
}

//prettier-ignore
export const commonLabels = [
  type('feat',            theme.shiny,     'Add a new capability or enhance an existing one'),
  type('improve',         theme.semiShiny, 'Something existing is made better, does not affect the interface (example: better error message)'),
  type('bug',             theme.danger,    'Something is not working the way it should'),
  type('chore',           theme.refine,    'Something that does not warrant a release, zero runtime impact'),
  type('perf',            theme.refine,    'Improve the efficiency of something'),
  type('docs',            theme.refine,    'Relates to knowledge transfer matter (refs, guides, tuts, examples, ...)'),
  type('tests',           theme.refine,    'Internal tests'),
  type('refactor',        theme.refine,    'Address tech debt, internal incidental complexity'),
  type('deps',            theme.refine,    'A dependency upgrade visible to users (so, not devDeps)'),
  type('question',        theme.social,    ''),
  note('user-resolved',                    ''),
  note('invalid',                          'Initial assumptions turned out wrong'),
  note('wontfix',                          'Resolving the issue was explicitly ruled out'),
  note('duplicate',                        'This issue existed already'),      
  note('breaking-change',                  'This issue existed already'), // todo consider color exception
  impact('high'), // todo consider color highlight 
  impact('medium'),
  impact('low'),
  effort('hard'),
  effort('modest'),
  effort('easy'),  // todo consider color highlight 
  needs('upstream',                  'An upstream component needs to be updated first'),
  needs('discussion',                'Open-ended conversation about something (ideation, design, analysis, ...)'),
  needs('clarification',             'Unable to answer question/feature without more info'),
  needs('investigation',             'Possibly an issue, needs more analysis/research'),      
  needs('use-cases',                 'More motivating examples needed to understand/appreciate idea/tradeoffs'),
  community('help-wanted',           'Not our focus, but accepting PRs'),
  community('good-first-issue',      'Good for newcomers'),
  scope('deps'),
  scope('cicd'),
] as Label[]
