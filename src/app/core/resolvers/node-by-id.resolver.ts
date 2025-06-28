import { ResolveFn } from '@angular/router';
import { Node } from '@wow/core/interfaces';
import { inject } from '@angular/core';
import { NodeService } from '@wow/core/services';
import { map } from 'rxjs';

export const NodeDetailPageByIdResolver: ResolveFn<Node> = (route, state) => {
  const nodeSupportService = inject(NodeService);
  const id = route.paramMap.get('nodeId');
  if (!id) {
    throw new Error('Node id not found in url');
  }

  return nodeSupportService.getById(Number(id)).pipe(
    map(res => new Node(res.data!))
  );
};
