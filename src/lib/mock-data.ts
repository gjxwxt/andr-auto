import { Plugin } from '@/types/plugin';

export const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: '微信抢红包',
    description: '自动检测并抢取微信红包',
    targetApp: 'com.tencent.mm',
    status: 'enabled',
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-17'),
    steps: [
      {
        id: 's1',
        name: '检测红包弹窗',
        actions: [
          {
            id: 'a1',
            conditions: [
              {
                id: 'c1',
                condition: {
                  id: 'cond1',
                  type: 'colorMatch',
                  params: {
                    x: 540,
                    y: 960,
                    color: '#FF5722',
                    tolerance: 10
                  }
                }
              }
            ],
            action: {
              type: 'click',
              params: {
                x: 540,
                y: 960
              }
            }
          }
        ]
      },
      {
        id: 's2',
        name: '点击开红包',
        actions: [
          {
            id: 'a2',
            conditions: [
              {
                id: 'c2',
                condition: {
                  id: 'cond2',
                  type: 'imageMatch',
                  params: {
                    x: 400,
                    y: 1200,
                    width: 280,
                    height: 280,
                    similarity: 80
                  }
                }
              }
            ],
            action: {
              type: 'click',
              params: {
                x: 540,
                y: 1340
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '自动签到',
    description: '每日自动签到领取积分',
    targetApp: 'com.example.app',
    status: 'disabled',
    createdAt: new Date('2025-10-10'),
    updatedAt: new Date('2025-10-10'),
    steps: []
  }
];
