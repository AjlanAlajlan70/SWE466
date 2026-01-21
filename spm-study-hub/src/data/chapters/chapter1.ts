import { Chapter } from './types';

export const chapter1: Chapter = {
  id: 'introduction-to-spm',
  slug: 'introduction-to-spm',
  chapterNumber: 1,
  title: 'Introduction to Software Project Management',
  description: 'Learn the fundamentals of software project management, including key concepts, challenges, and the role of project managers.',
  icon: '🚀',
  slides: [
    // Slide 1: Title
    {
      id: 'ch1-title',
      type: 'title',
      chapterNumber: 1,
      title: 'Introduction to Software Project Management',
      subtitle: 'Understanding the Foundation of Successful Software Projects',
      objective: 'Learn what software project management is, why it matters, and what makes software projects unique'
    },

    // Slide 2: Section 1
    {
      id: 'ch1-s1',
      type: 'section',
      sectionNumber: 1,
      title: 'What is a Project?'
    },

    // Slide 3: Project Definition
    {
      id: 'ch1-project-def',
      type: 'content',
      icon: '📋',
      title: 'Defining a Project',
      content: [
        {
          type: 'definition',
          term: 'Project',
          definition: 'A temporary endeavor undertaken to create a unique product, service, or result with a defined beginning and end.'
        },
        {
          type: 'bullet',
          items: [
            '**Temporary**: Has a definite start and end date',
            '**Unique**: Creates something that has not existed before',
            '**Progressive elaboration**: Details emerge over time'
          ]
        },
        {
          type: 'highlight',
          icon: '💡',
          content: 'Projects differ from operations - operations are ongoing and repetitive, while projects are finite.'
        }
      ]
    },

    // Slide 4: Project Characteristics
    {
      id: 'ch1-project-chars',
      type: 'content',
      icon: '🎯',
      title: 'Key Project Characteristics',
      content: [
        {
          type: 'bullet',
          items: [
            '**Defined objectives**: Clear goals and deliverables',
            '**Resource constraints**: Limited time, budget, and people',
            '**Cross-functional teams**: Multiple skill sets required',
            '**Risk and uncertainty**: Unknown factors to manage',
            '**Stakeholder involvement**: Multiple interested parties'
          ]
        },
        {
          type: 'warning',
          content: 'Projects without clear objectives are 2.5x more likely to fail than those with well-defined goals.'
        }
      ]
    },

    // Slide 5: Section 2
    {
      id: 'ch1-s2',
      type: 'section',
      sectionNumber: 2,
      title: 'Software Projects: What Makes Them Special?'
    },

    // Slide 6: Software Project Uniqueness
    {
      id: 'ch1-sw-unique',
      type: 'content',
      icon: '💻',
      title: 'What Makes Software Projects Unique?',
      content: [
        {
          type: 'text',
          content: 'Software projects have characteristics that distinguish them from traditional engineering projects:'
        },
        {
          type: 'bullet',
          items: [
            '**Intangibility**: Software cannot be seen or touched physically',
            '**Malleability**: Easy to change, which can be both good and bad',
            '**Complexity**: Systems can have millions of lines of code',
            '**Conformity**: Must interface with existing systems and standards'
          ]
        }
      ]
    },

    // Slide 7: Software Project Challenges
    {
      id: 'ch1-sw-challenges',
      type: 'content',
      icon: '⚠️',
      title: 'Common Software Project Challenges',
      content: [
        {
          type: 'bullet',
          items: [
            '**Requirement volatility**: Users often don\'t know what they want until they see it',
            '**Technology changes**: New tools and frameworks emerge constantly',
            '**Communication gaps**: Technical and non-technical stakeholders speak different languages',
            '**Estimation difficulty**: Software effort is notoriously hard to estimate'
          ]
        },
        {
          type: 'highlight',
          icon: '📊',
          content: 'According to the Standish Group, only about 29% of software projects are successful (on time, on budget, with required features).'
        }
      ]
    },

    // Slide 8: Comparison - Software vs Traditional
    {
      id: 'ch1-comparison',
      type: 'comparison',
      title: 'Software vs Traditional Projects',
      leftColumn: {
        title: 'Software Projects',
        items: [
          'Intangible deliverables',
          'Easy to modify',
          'Progress hard to measure',
          'Requirements often unclear',
          'Rapid technology changes'
        ]
      },
      rightColumn: {
        title: 'Traditional Projects',
        items: [
          'Physical deliverables',
          'Costly to change',
          'Progress visually evident',
          'Requirements usually clear',
          'Stable methodologies'
        ]
      }
    },

    // Slide 9: Section 3
    {
      id: 'ch1-s3',
      type: 'section',
      sectionNumber: 3,
      title: 'What is Project Management?'
    },

    // Slide 10: PM Definition
    {
      id: 'ch1-pm-def',
      type: 'content',
      icon: '📊',
      title: 'Project Management Defined',
      content: [
        {
          type: 'definition',
          term: 'Project Management',
          definition: 'The application of knowledge, skills, tools, and techniques to project activities to meet project requirements.'
        },
        {
          type: 'text',
          content: 'Project management involves balancing competing constraints while delivering value to stakeholders.'
        }
      ]
    },

    // Slide 11: Triple Constraint
    {
      id: 'ch1-triple',
      type: 'content',
      icon: '📐',
      title: 'The Triple Constraint',
      content: [
        {
          type: 'text',
          content: 'Every project is constrained by three interrelated factors that must be balanced:'
        },
        {
          type: 'table',
          headers: ['Constraint', 'Question', 'Impact'],
          rows: [
            ['Scope', 'What will be delivered?', 'Features and quality'],
            ['Time', 'When will it be done?', 'Schedule and deadlines'],
            ['Cost', 'How much will it cost?', 'Budget and resources']
          ]
        },
        {
          type: 'warning',
          content: 'Changing any one constraint affects the others. You cannot add scope without impacting time or cost.'
        }
      ]
    },

    // Slide 12: Modern Constraints
    {
      id: 'ch1-modern-constraints',
      type: 'content',
      icon: '🔄',
      title: 'Beyond the Triple Constraint',
      content: [
        {
          type: 'text',
          content: 'Modern project management recognizes additional constraints:'
        },
        {
          type: 'bullet',
          items: [
            '**Quality**: Meets specifications and user expectations',
            '**Risk**: Probability and impact of uncertain events',
            '**Resources**: Availability of people, equipment, and materials',
            '**Customer satisfaction**: Stakeholder acceptance and value delivery'
          ]
        },
        {
          type: 'highlight',
          icon: '💡',
          content: 'The most successful projects balance all constraints while maximizing stakeholder value.'
        }
      ]
    },

    // Slide 13: Section 4
    {
      id: 'ch1-s4',
      type: 'section',
      sectionNumber: 4,
      title: 'The Role of the Project Manager'
    },

    // Slide 14: PM Role
    {
      id: 'ch1-pm-role',
      type: 'content',
      icon: '👤',
      title: 'What Does a Project Manager Do?',
      content: [
        {
          type: 'text',
          content: 'The project manager is responsible for achieving project objectives through effective leadership and management.'
        },
        {
          type: 'bullet',
          items: [
            '**Planning**: Defining scope, schedule, and resources',
            '**Organizing**: Assembling and coordinating the team',
            '**Leading**: Motivating and guiding team members',
            '**Controlling**: Monitoring progress and making adjustments'
          ]
        }
      ]
    },

    // Slide 15: PM Skills
    {
      id: 'ch1-pm-skills',
      type: 'content',
      icon: '🛠️',
      title: 'Essential Project Manager Skills',
      content: [
        {
          type: 'table',
          headers: ['Skill Category', 'Examples'],
          rows: [
            ['Technical', 'Domain knowledge, tools, methods'],
            ['Leadership', 'Vision, motivation, decision-making'],
            ['Management', 'Planning, organizing, controlling'],
            ['Communication', 'Listening, presenting, negotiating'],
            ['Problem-solving', 'Analysis, creativity, judgment']
          ]
        },
        {
          type: 'highlight',
          icon: '🌟',
          content: 'Soft skills (communication, leadership) are often more important than technical skills for project success.'
        }
      ]
    },

    // Slide 16: PM vs Technical Lead
    {
      id: 'ch1-pm-vs-tech',
      type: 'comparison',
      title: 'Project Manager vs Technical Lead',
      leftColumn: {
        title: 'Project Manager',
        items: [
          'Focuses on process and delivery',
          'Manages schedule and budget',
          'Coordinates stakeholders',
          'Removes obstacles',
          'Reports to management'
        ]
      },
      rightColumn: {
        title: 'Technical Lead',
        items: [
          'Focuses on technical quality',
          'Makes architecture decisions',
          'Mentors developers',
          'Reviews code',
          'Solves technical problems'
        ]
      }
    },

    // Slide 17: Section 5
    {
      id: 'ch1-s5',
      type: 'section',
      sectionNumber: 5,
      title: 'Software Development Life Cycles'
    },

    // Slide 18: SDLC Overview
    {
      id: 'ch1-sdlc',
      type: 'content',
      icon: '🔄',
      title: 'Software Development Life Cycle (SDLC)',
      content: [
        {
          type: 'definition',
          term: 'SDLC',
          definition: 'A framework defining the phases and tasks involved in developing software from initial planning through deployment and maintenance.'
        },
        {
          type: 'bullet',
          items: [
            '**Requirements**: Understanding what to build',
            '**Design**: Planning how to build it',
            '**Implementation**: Writing the code',
            '**Testing**: Verifying it works correctly',
            '**Deployment**: Releasing to users',
            '**Maintenance**: Ongoing support and updates'
          ]
        }
      ]
    },

    // Slide 19: Timeline - SDLC Evolution
    {
      id: 'ch1-timeline',
      type: 'timeline',
      title: 'Evolution of Software Development Approaches',
      events: [
        {
          year: '1970s',
          title: 'Waterfall Model',
          description: 'Sequential phases, heavy documentation'
        },
        {
          year: '1980s',
          title: 'Spiral Model',
          description: 'Risk-driven, iterative approach'
        },
        {
          year: '1990s',
          title: 'RAD & RUP',
          description: 'Rapid prototyping, unified process'
        },
        {
          year: '2001',
          title: 'Agile Manifesto',
          description: 'Iterative, customer-focused development'
        },
        {
          year: '2010s+',
          title: 'DevOps & CI/CD',
          description: 'Continuous integration and delivery'
        }
      ]
    },

    // Slide 20: Waterfall vs Agile
    {
      id: 'ch1-waterfall-agile',
      type: 'comparison',
      title: 'Waterfall vs Agile Approaches',
      leftColumn: {
        title: 'Waterfall',
        items: [
          'Sequential phases',
          'Heavy upfront planning',
          'Documentation-focused',
          'Change is expensive',
          'Works for stable requirements'
        ]
      },
      rightColumn: {
        title: 'Agile',
        items: [
          'Iterative cycles',
          'Adaptive planning',
          'Working software focus',
          'Embraces change',
          'Works for evolving requirements'
        ]
      }
    },

    // Slide 21: Section 6
    {
      id: 'ch1-s6',
      type: 'section',
      sectionNumber: 6,
      title: 'Why Projects Fail'
    },

    // Slide 22: Project Failure Reasons
    {
      id: 'ch1-failures',
      type: 'content',
      icon: '❌',
      title: 'Top Reasons Software Projects Fail',
      content: [
        {
          type: 'bullet',
          items: [
            '**Unclear requirements**: 37% of failed projects cite this',
            '**Poor communication**: Stakeholders not aligned',
            '**Scope creep**: Uncontrolled changes to scope',
            '**Unrealistic schedules**: Pressure to deliver too fast',
            '**Inadequate testing**: Quality issues discovered too late'
          ]
        },
        {
          type: 'warning',
          content: 'The cost of fixing a bug increases 10x at each stage from requirements to production.'
        }
      ]
    },

    // Slide 23: Success Factors
    {
      id: 'ch1-success',
      type: 'content',
      icon: '✅',
      title: 'Keys to Project Success',
      content: [
        {
          type: 'bullet',
          items: [
            '**Executive sponsorship**: Strong support from leadership',
            '**Clear requirements**: Well-defined and agreed scope',
            '**Realistic planning**: Achievable schedules and budgets',
            '**Skilled team**: Right people with right skills',
            '**Effective communication**: Regular updates and feedback'
          ]
        },
        {
          type: 'highlight',
          icon: '📈',
          content: 'Projects with engaged executive sponsors are 40% more likely to succeed.'
        }
      ]
    },

    // Slide 24: Takeaway
    {
      id: 'ch1-takeaway',
      type: 'takeaway',
      title: 'Key Takeaways',
      points: [
        {
          icon: '📋',
          title: 'Projects Are Unique',
          description: 'Temporary endeavors with defined objectives, unlike ongoing operations'
        },
        {
          icon: '💻',
          title: 'Software Is Special',
          description: 'Intangibility and malleability create unique management challenges'
        },
        {
          icon: '📐',
          title: 'Balance Constraints',
          description: 'Scope, time, and cost are interrelated and must be managed together'
        },
        {
          icon: '🎯',
          title: 'Success Requires Discipline',
          description: 'Clear requirements, good communication, and skilled teams drive success'
        }
      ]
    },

    // Slide 25: Mind Map
    {
      id: 'ch1-mindmap',
      type: 'mindmap',
      title: 'Chapter 1 Mind Map',
      centerLabel: 'Software Project Management',
      branches: [
        {
          label: 'What is a Project?',
          items: [
            'Temporary endeavor',
            'Unique product/result',
            'Progressive elaboration',
            'Defined start & end'
          ]
        },
        {
          label: 'Software Project Traits',
          items: [
            'Intangibility',
            'Malleability',
            'Complexity',
            'Requirement volatility'
          ]
        },
        {
          label: 'Triple Constraint',
          items: [
            'Scope - What to deliver',
            'Time - When to deliver',
            'Cost - Budget & resources',
            'All three interrelated'
          ]
        },
        {
          label: 'Project Manager Role',
          items: [
            'Planning & organizing',
            'Leading & motivating',
            'Controlling progress',
            'Stakeholder coordination'
          ]
        },
        {
          label: 'SDLC Approaches',
          items: [
            'Waterfall - Sequential',
            'Agile - Iterative',
            'Spiral - Risk-driven',
            'DevOps - Continuous'
          ]
        },
        {
          label: 'Success Factors',
          items: [
            'Executive sponsorship',
            'Clear requirements',
            'Effective communication',
            'Skilled team'
          ]
        }
      ]
    }
  ],

  quiz: {
    mcq: [
      {
        id: 'ch1-mcq-1',
        question: 'Which of the following BEST describes a project?',
        options: [
          'An ongoing operation that produces the same output repeatedly',
          'A temporary endeavor undertaken to create a unique product or result',
          'A permanent organizational function with continuous activities',
          'A standard process that follows the same steps every time'
        ],
        correctIndex: 1,
        explanation: 'A project is defined as a temporary endeavor undertaken to create a unique product, service, or result. Unlike operations, projects have a defined beginning and end.'
      },
      {
        id: 'ch1-mcq-2',
        question: 'What is NOT a characteristic that makes software projects unique?',
        options: [
          'Intangibility of the product',
          'Ease of making changes (malleability)',
          'Predictable and stable requirements',
          'Complexity of the systems'
        ],
        correctIndex: 2,
        explanation: 'Software projects are known for having volatile, changing requirements - not predictable ones. This is one of the key challenges in software project management.'
      },
      {
        id: 'ch1-mcq-3',
        question: 'The Triple Constraint in project management consists of:',
        options: [
          'People, Process, and Technology',
          'Planning, Execution, and Monitoring',
          'Scope, Time, and Cost',
          'Quality, Risk, and Resources'
        ],
        correctIndex: 2,
        explanation: 'The Triple Constraint (also called the Iron Triangle) consists of Scope, Time, and Cost. These three constraints are interrelated, and changes to one affect the others.'
      },
      {
        id: 'ch1-mcq-4',
        question: 'According to the Standish Group, approximately what percentage of software projects are successful?',
        options: [
          '29%',
          '50%',
          '65%',
          '80%'
        ],
        correctIndex: 0,
        explanation: 'The Standish Group\'s CHAOS Report indicates that only about 29% of software projects are considered successful (delivered on time, on budget, with required features).'
      },
      {
        id: 'ch1-mcq-5',
        question: 'Which skill category is often considered MORE important than technical skills for project managers?',
        options: [
          'Programming skills',
          'Database design skills',
          'Communication and leadership skills',
          'Testing skills'
        ],
        correctIndex: 2,
        explanation: 'Soft skills like communication and leadership are often more critical to project success than technical skills, as project managers spend most of their time coordinating people and stakeholders.'
      },
      {
        id: 'ch1-mcq-6',
        question: 'What does SDLC stand for?',
        options: [
          'Software Design Life Control',
          'Software Development Life Cycle',
          'System Development Logic Control',
          'Systematic Design Learning Curve'
        ],
        correctIndex: 1,
        explanation: 'SDLC stands for Software Development Life Cycle - a framework that defines the phases and tasks involved in developing software from planning through maintenance.'
      },
      {
        id: 'ch1-mcq-7',
        question: 'What is the PRIMARY difference between a Project Manager and a Technical Lead?',
        options: [
          'Project Managers write code while Technical Leads manage schedules',
          'Project Managers focus on process and delivery while Technical Leads focus on technical quality',
          'Technical Leads report to management while Project Managers mentor developers',
          'There is no difference; they are the same role'
        ],
        correctIndex: 1,
        explanation: 'Project Managers focus on process, delivery, schedules, and stakeholder coordination. Technical Leads focus on technical quality, architecture decisions, and mentoring developers.'
      },
      {
        id: 'ch1-mcq-8',
        question: 'Which approach to software development was introduced with the Agile Manifesto in 2001?',
        options: [
          'Waterfall methodology',
          'Spiral model',
          'Iterative, customer-focused development',
          'DevOps and CI/CD'
        ],
        correctIndex: 2,
        explanation: 'The Agile Manifesto, published in 2001, introduced principles for iterative, customer-focused development that embraces change and values working software over comprehensive documentation.'
      },
      {
        id: 'ch1-mcq-9',
        question: 'What percentage of failed software projects cite unclear requirements as a cause?',
        options: [
          '10%',
          '25%',
          '37%',
          '50%'
        ],
        correctIndex: 2,
        explanation: '37% of failed projects cite unclear requirements as a primary cause of failure, making it one of the top reasons software projects fail.'
      },
      {
        id: 'ch1-mcq-10',
        question: 'Projects with engaged executive sponsors are how much more likely to succeed?',
        options: [
          '10% more likely',
          '20% more likely',
          '40% more likely',
          '60% more likely'
        ],
        correctIndex: 2,
        explanation: 'Research shows that projects with engaged executive sponsors are 40% more likely to succeed, highlighting the importance of leadership support.'
      },
      {
        id: 'ch1-mcq-11',
        question: 'Which characteristic distinguishes projects from ongoing operations?',
        options: [
          'Projects require resources while operations do not',
          'Projects are permanent while operations are temporary',
          'Projects are temporary with defined end dates while operations are ongoing',
          'Projects are simpler than operations'
        ],
        correctIndex: 2,
        explanation: 'The key distinction is that projects are temporary (have a defined beginning and end) while operations are ongoing and repetitive without a predetermined end.'
      },
      {
        id: 'ch1-mcq-12',
        question: 'What is "scope creep" in project management?',
        options: [
          'When the project scope is defined too narrowly',
          'Uncontrolled changes or growth in project scope',
          'When scope is reduced to meet deadlines',
          'The process of defining project scope'
        ],
        correctIndex: 1,
        explanation: 'Scope creep refers to uncontrolled changes or continuous growth in a project\'s scope after the project begins, often without corresponding increases in time, budget, or resources.'
      },
      {
        id: 'ch1-mcq-13',
        question: 'The cost of fixing a bug increases by approximately how much at each stage from requirements to production?',
        options: [
          '2x',
          '5x',
          '10x',
          '100x'
        ],
        correctIndex: 2,
        explanation: 'Studies show that the cost of fixing a defect increases by approximately 10x at each stage - finding and fixing a bug during requirements is 10x cheaper than during design, which is 10x cheaper than during testing, etc.'
      },
      {
        id: 'ch1-mcq-14',
        question: 'Which of the following is NOT a phase in the typical SDLC?',
        options: [
          'Requirements gathering',
          'Marketing and sales',
          'Testing',
          'Deployment'
        ],
        correctIndex: 1,
        explanation: 'Marketing and sales are not part of the SDLC. The typical SDLC phases include Requirements, Design, Implementation, Testing, Deployment, and Maintenance.'
      },
      {
        id: 'ch1-mcq-15',
        question: 'What does "progressive elaboration" mean in project management?',
        options: [
          'Projects should be planned completely upfront',
          'Project details emerge and are refined over time',
          'Projects become progressively more complex',
          'Team members progressively leave the project'
        ],
        correctIndex: 1,
        explanation: 'Progressive elaboration means that project details are developed and refined incrementally over time as more information becomes available, rather than being fully defined at the start.'
      }
    ],

    trueFalse: [
      {
        id: 'ch1-tf-1',
        statement: 'A project is a permanent endeavor that creates repetitive outputs.',
        isTrue: false,
        explanation: 'False. A project is a TEMPORARY endeavor (not permanent) that creates a UNIQUE product or result (not repetitive outputs). Ongoing, repetitive work is called operations.'
      },
      {
        id: 'ch1-tf-2',
        statement: 'Software\'s intangibility makes it easier to measure project progress compared to construction projects.',
        isTrue: false,
        explanation: 'False. Software\'s intangibility actually makes progress HARDER to measure. In construction, you can see physical progress (foundation poured, walls built). In software, it\'s difficult to visually assess how much work is complete.'
      },
      {
        id: 'ch1-tf-3',
        statement: 'In the Triple Constraint, changing scope will impact either time or cost (or both).',
        isTrue: true,
        explanation: 'True. The Triple Constraint shows that scope, time, and cost are interrelated. Adding scope typically requires more time, more resources (cost), or both. You cannot add features for free.'
      },
      {
        id: 'ch1-tf-4',
        statement: 'The Waterfall model embraces change and works best with evolving requirements.',
        isTrue: false,
        explanation: 'False. The Waterfall model is sequential and documentation-heavy, making changes expensive. Waterfall works best with stable, well-defined requirements. Agile is the approach that embraces change.'
      },
      {
        id: 'ch1-tf-5',
        statement: 'Executive sponsorship is one of the key factors for project success.',
        isTrue: true,
        explanation: 'True. Strong executive sponsorship provides projects with support, resources, and authority to overcome obstacles. Projects with engaged executive sponsors are 40% more likely to succeed.'
      },
      {
        id: 'ch1-tf-6',
        statement: 'Project managers should focus primarily on writing code and technical implementation.',
        isTrue: false,
        explanation: 'False. Project managers focus on process, delivery, coordination, and stakeholder management. Technical implementation is the responsibility of developers and technical leads.'
      },
      {
        id: 'ch1-tf-7',
        statement: 'The Agile Manifesto was published in 2001.',
        isTrue: true,
        explanation: 'True. The Agile Manifesto was created and published in 2001 by a group of software developers who sought a better approach to software development than traditional waterfall methods.'
      },
      {
        id: 'ch1-tf-8',
        statement: 'Poor communication is one of the top reasons software projects fail.',
        isTrue: true,
        explanation: 'True. Poor communication, leading to stakeholder misalignment and misunderstandings, is consistently cited as one of the top reasons for project failure.'
      }
    ],

    matching: [
      {
        id: 'ch1-match-1',
        instruction: 'Match each constraint with its primary question',
        pairs: [
          { left: 'Scope', right: 'What will be delivered?' },
          { left: 'Time', right: 'When will it be done?' },
          { left: 'Cost', right: 'How much will it cost?' },
          { left: 'Quality', right: 'Does it meet specifications?' }
        ],
        explanation: 'The Triple Constraint plus Quality: Scope defines deliverables, Time defines schedule, Cost defines budget, and Quality ensures the product meets expectations.'
      },
      {
        id: 'ch1-match-2',
        instruction: 'Match each SDLC approach with its key characteristic',
        pairs: [
          { left: 'Waterfall', right: 'Sequential phases' },
          { left: 'Agile', right: 'Iterative cycles' },
          { left: 'Spiral', right: 'Risk-driven approach' },
          { left: 'DevOps', right: 'Continuous integration' }
        ],
        explanation: 'Each development approach has distinct characteristics: Waterfall uses sequential phases, Agile uses short iterative cycles, Spiral focuses on risk management, and DevOps emphasizes continuous integration and delivery.'
      },
      {
        id: 'ch1-match-3',
        instruction: 'Match each role with their primary focus',
        pairs: [
          { left: 'Project Manager', right: 'Process and delivery' },
          { left: 'Technical Lead', right: 'Architecture decisions' },
          { left: 'Executive Sponsor', right: 'Organizational support' },
          { left: 'Stakeholder', right: 'Project requirements' }
        ],
        explanation: 'Project Managers focus on process/delivery, Technical Leads on architecture, Executive Sponsors provide organizational support, and Stakeholders define requirements and needs.'
      },
      {
        id: 'ch1-match-4',
        instruction: 'Match each project management function with its description',
        pairs: [
          { left: 'Planning', right: 'Defining scope and resources' },
          { left: 'Organizing', right: 'Assembling the team' },
          { left: 'Leading', right: 'Motivating team members' },
          { left: 'Controlling', right: 'Monitoring progress' }
        ],
        explanation: 'The four key functions of project management: Planning defines what to do, Organizing assembles resources, Leading motivates people, and Controlling ensures the plan is followed.'
      }
    ],

    fillBlank: [
      {
        id: 'ch1-fb-1',
        question: 'The Triple Constraint consists of Scope, Time, and ___.',
        acceptableAnswers: ['cost', 'budget', 'money'],
        explanation: 'The Triple Constraint (also known as the Iron Triangle) consists of Scope, Time, and Cost. These three factors are interrelated and must be balanced.'
      },
      {
        id: 'ch1-fb-2',
        question: 'SDLC stands for Software Development Life ___.',
        acceptableAnswers: ['cycle', 'Cycle'],
        explanation: 'SDLC stands for Software Development Life Cycle - a framework defining the phases of software development from planning through maintenance.'
      },
      {
        id: 'ch1-fb-3',
        question: 'Uncontrolled changes to project scope is called scope ___.',
        acceptableAnswers: ['creep', 'Creep'],
        explanation: 'Scope creep refers to uncontrolled changes or continuous growth in a project\'s scope, often leading to project failure if not managed properly.'
      },
      {
        id: 'ch1-fb-4',
        question: 'The ___ Manifesto was published in 2001 and introduced iterative, customer-focused development.',
        acceptableAnswers: ['agile', 'Agile'],
        explanation: 'The Agile Manifesto, published in 2001, established principles for iterative development that values working software, customer collaboration, and responding to change.'
      }
    ]
  }
};
